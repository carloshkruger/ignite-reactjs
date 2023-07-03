import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountOfSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCicle: (data: CreateCycleData) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext<CycleContextType>(
  {} as CycleContextType,
)

interface CyclesContextProviderProps {
  children: ReactNode
}

const cyclesStateCacheKey = '@ignite-timer:cycles-state-1'

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    { cycles: [], activeCycleId: null },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(cyclesStateCacheKey)
      if (storedStateAsJSON) {
        const dateKeys: Array<keyof Cycle> = [
          'startDate',
          'finishedDate',
          'interruptedDate',
        ]
        return JSON.parse(storedStateAsJSON, (key, value) => {
          if (dateKeys.includes(key as any)) {
            return new Date(value)
          }
          return value
        })
      }
      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountOfSecondsPassed, setAmountOfSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate)
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(cyclesStateCacheKey, stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountOfSecondsPassed(seconds)
  }

  function createNewCicle(data: CreateCycleData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setSecondsPassed(0)
  }

  function markCurrentCycleAsFinished() {
    dispatch(finishCurrentCycleAction())
  }

  function interruptCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountOfSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCicle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
