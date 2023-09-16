import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Author from './Author'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name: string

  @column()
  public author_name: string

  @column()
  public author_id: number

  @column()
  public number_of_pages: number

  @column.dateTime({ autoCreate: true , serialize:(value:DateTime)=> value.toFormat('yyyy LLL dd')})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize:(value:DateTime)=> value.toFormat('yyyy LLL dd')})
  public updatedAt: DateTime

  @belongsTo(()=> Author, {
    localKey: 'author_id'
  })
  public author: BelongsTo<typeof Author>
}
