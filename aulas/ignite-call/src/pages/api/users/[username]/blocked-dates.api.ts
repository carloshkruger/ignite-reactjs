import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'
import dayjs from 'dayjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  if (!req.query.year) {
    return res.status(400).json({ message: 'Year not provided.' })
  }

  if (!req.query.month) {
    return res.status(400).json({ message: 'Month not provided.' })
  }

  const year = req.query.year
  const month = String(req.query.month).padStart(2, '0')

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exists' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (weekDay) =>
      !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      ),
  )

  const blockedDatesRaw = await prisma.$queryRaw<{ date: number }[]>`
    SELECT EXTRACT(DAY FROM schedulings.date) AS date,
           COUNT(schedulings.date) AS amount,
           ((user_time_intervals.end_time_in_minutes - user_time_intervals.start_time_in_minutes) / 60) AS size
      FROM schedulings
 LEFT JOIN user_time_intervals
        ON user_time_intervals.week_day = WEEKDAY(DATE_ADD(schedulings.date, INTERVAL 1 DAY))
     WHERE schedulings.user_id = ${user.id}
       AND DATE_FORMAT(schedulings.date, "%Y-%m") = ${`${year}-${month}`}
  GROUP BY EXTRACT(DAY FROM schedulings.date),
           ((user_time_intervals.end_time_in_minutes - user_time_intervals.start_time_in_minutes) / 60)
    HAVING amount >= size
  `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return res.status(200).json({ blockedWeekDays, blockedDates })
}
