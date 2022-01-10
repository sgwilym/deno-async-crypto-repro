import { assert } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import { CryptoDriverNoble } from "./call_crypto.ts";

const message = new TextEncoder().encode("Hello");

Deno.test("generateKeypairBytes", async () => {
  const keypair = await CryptoDriverNoble.generateKeypairBytes();

  assert(keypair, "Made keypair");
});

Deno.test("sign", async () => {
  const keypair = await CryptoDriverNoble.generateKeypairBytes();
  const signed = await CryptoDriverNoble.sign(keypair, message);

  assert(signed, "Signed a message");
});

Deno.test("verify", async () => {
  const keypair = await CryptoDriverNoble.generateKeypairBytes();
  const signed = await CryptoDriverNoble.sign(keypair, message);

  const verified = CryptoDriverNoble.verify(keypair.pubkey, signed, message);

  assert(verified, "Verified a message");
});
