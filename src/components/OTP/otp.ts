import type { InjectionKey, Ref } from 'vue'

export interface OtpContext {
  otpValue: Ref<string>
  cursorIndex: Ref<number>
  redacted: Ref<boolean>
  /**
   * Registers an item index. Returns a function which unregisters it.
   */
  register: (_index: number) => () => void
}

export const OTP_KEY = Symbol('vui-otp') as InjectionKey<OtpContext>
