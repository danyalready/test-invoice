export const is = {
  PASSWORD: (string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])\w.{8,}$/

    return string.match(regex) ? true : false
  },
}
