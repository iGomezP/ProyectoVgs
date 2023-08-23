import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public static readonly SUCCESS = 'success';
  public static readonly ERROR = 'error';
  public static readonly WARN = 'warn';
  public static readonly INFO = 'info';

  constructor(private toastService: MessageService) {}

  showToast(severity: string, summary: string, detail: string) {
    if (!summary.length || !detail.length) {
      this.toastService.add({
        severity,
        summary: 'Error',
        detail: 'Se ha producido un error',
      });
    } else {
      if (severity === ToastService.ERROR) {
        this.toastGenerator(ToastService.ERROR, summary, detail);
      } else if (severity === ToastService.SUCCESS) {
        this.toastGenerator(ToastService.SUCCESS, summary, detail);
      } else if (severity === ToastService.WARN) {
        this.toastGenerator(ToastService.WARN, summary, detail);
      } else if (severity === ToastService.INFO) {
        this.toastGenerator(ToastService.INFO, summary, detail);
      }
    }
  }

  private toastGenerator(severity: string, summary: string, detail: string) {
    this.toastService.add({
      severity,
      summary,
      detail,
    });
  }
}
