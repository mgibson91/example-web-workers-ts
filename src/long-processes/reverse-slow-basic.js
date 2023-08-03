self.onmessage = (e) => {
  console.log(e)
  const { text } = e.data;

  setTimeout(() => {
    const reversed = text.split("").reverse().join("");
    const reponse = { reversed };
    self.postMessage(JSON.stringify(reponse));
  }, 2000);
}

