export interface DialogData {
  type?: 'success' | 'error';
  title?: string;
  message?: string;
  buttons?: Array<string>;
  extras?: any;
}
