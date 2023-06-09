// 声明全局变量

declare type Recordable<T = any> = Record<string, T>

declare namespace Menu {
  interface MenuOptions {
    path: string
    title: string
    icon?: string
    isLink?: string
    close?: boolean
    children?: MenuOptions[]
  }
}
