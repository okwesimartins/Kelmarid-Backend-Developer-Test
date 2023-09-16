import { DateTime } from 'luxon'
import { BaseModel, column , hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Book, {
    foreignKey: 'author_id'
  })
  public book: HasMany<typeof Book>
  
}
