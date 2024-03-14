/** @class environment that give you access to the current state of your application. */
class ENV {
  /**@type {string} @description secret key for api*/
  readonly ACCESSKEY: string =
    '01010010011011110111011101100100011110010100000000110001001101110011001000110000';

  /**@type {RegExp}*/
  readonly validString: RegExp =
    /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]+$/;

  /**@type {RegExp}*/
  readonly hasSpace: RegExp = /\s/;
}

/** @exports ENV constructor for the class & then  exports it as a element. @type {class} */
export const environment = new ENV();
