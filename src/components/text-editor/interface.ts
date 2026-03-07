export interface IProps {
  contents?: string;
  onBlur?: () => void;
  onSave: (contents: string) => void;
  onChange?: (contents: string) => void;
}

export interface IImageInfo {
  index: number;
  src: string;
  size: number;
  select: () => void;
  delete: () => void;
}