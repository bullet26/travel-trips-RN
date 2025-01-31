import { ImageAttributesNest } from 'types'

export interface ICreateTag {
  name: string
}

export type IUpdateTag = Partial<ICreateTag>

export interface TagNest extends ICreateTag {
  id: number
  createdAt: Date
  updatedAt: Date
  places?: { name: string; id: string; images: ImageAttributesNest[] }[]
}

export interface TagAttributesNest {
  name: string
  id: number
}
