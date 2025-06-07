export const setToLocalStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string) => {
   let val =  localStorage.getItem(key)
   if(val){
    val = JSON.parse(val) 
   }
   return val
}
