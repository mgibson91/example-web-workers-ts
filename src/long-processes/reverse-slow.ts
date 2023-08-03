export interface ReverseSlowInput {
  text: string;
}

export interface ReverseSlowResponse {
  reversed: string;
}

export const reverseSlow = async ({ text }: ReverseSlowInput): Promise<ReverseSlowResponse> => {
  // Wait for 2 seconds before returning the reversed text
  await new Promise((resolve) => { setTimeout(resolve, 2000); });
  const reversed = text.split("").reverse().join("");
  return { reversed }
}


