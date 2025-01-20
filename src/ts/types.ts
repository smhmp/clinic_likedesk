export type selectComponentOption = {
  text: string
  value: string
}

export type ISelectBirth = {
    text: number;
    value: number;
    spc: number;
}

export type configs = {
  listOpts: [];
  onClick: string;
  onSelect(...any): void
  otherOpt: {
    optTitle:string
    optCode:string
    onSelected(...any): void
  }
}
