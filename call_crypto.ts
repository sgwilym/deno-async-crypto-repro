import * as ed from "https://deno.land/x/ed25519/mod.ts";

export class CryptoDriverNoble {
  static async generateKeypairBytes() {
    const secret = ed.utils.randomPrivateKey();
    const pubkey = await ed.getPublicKey(secret);

    return {
      pubkey,
      secret,
    };
  }
  static sign(
    keypairBytes: {
      pubkey: Uint8Array;
      secret: Uint8Array;
    },
    msg: Uint8Array,
  ): Promise<Uint8Array> {
    return ed.sign(msg, keypairBytes.secret);
  }
  static async verify(
    publicKey: Uint8Array,
    sig: Uint8Array,
    msg: string | Uint8Array,
  ): Promise<boolean> {
    try {
      const result = await ed.verify(sig, msg, publicKey);
      return result;
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  }
}
