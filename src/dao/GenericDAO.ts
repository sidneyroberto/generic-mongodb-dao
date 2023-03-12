import { IGenericDAO } from './IGenericDAO'
import {
  Db,
  Collection,
  Document,
  ObjectId,
  FindCursor,
  Filter,
  OptionalUnlessRequiredId,
} from 'mongodb'

export abstract class GenericDAO<T extends Document> implements IGenericDAO<T> {
  public readonly _collection: Collection<T>

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection<T>(collectionName)
  }

  async create(obj: T): Promise<string> {
    const result = await this._collection.insertOne(
      obj as OptionalUnlessRequiredId<T>
    )
    return result.insertedId.toString()
  }

  async update(id: string, obj: any): Promise<boolean> {
    const filter = { _id: new ObjectId(id) } as Filter<T>
    const options = { upsert: false }
    const result = await this._collection.updateOne(
      filter,
      { $set: obj },
      options
    )
    return result.matchedCount > 0
  }

  async delete(id: string): Promise<boolean> {
    const filter = { _id: new ObjectId(id) } as Filter<T>
    const result = await this._collection.deleteOne(filter)
    return result.deletedCount > 0
  }

  async findOne(id: string): Promise<T> {
    const filter = { _id: new ObjectId(id) } as Filter<T>
    const result = (await this._collection.findOne(filter)) as unknown as T
    return result
  }

  protected _fetchCursor?(cursor: FindCursor): Promise<T[]>
}
