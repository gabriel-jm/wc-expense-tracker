type Listener<T> = (data: T) => void|Promise<void>

export class EventEmitter<T = unknown> {
  #eventNames: string[]
  #listeners: Map<string, Set<Listener<T>>> = new Map()

  constructor(...eventNames: string[]) {
    this.#eventNames = eventNames

    for (const eventName of eventNames) {
      this.#listeners.set(eventName, new Set())
    }
  }

  on(event: string, listener: Listener<T>) {
    if (event in this.#eventNames) return this

    this.#listeners.get(event)?.add(listener)
    return this
  }

  async emit(events: string | string[], value: T) {    
    for (const event of [events].flat()) {
      for (const listener of this.#listeners.get(event)!.values()) {
        const possiblePromise = listener(value)
  
        if (possiblePromise instanceof Promise) {
          await possiblePromise
        }
      }
    }
  }
}
