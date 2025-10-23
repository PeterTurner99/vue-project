<script lang="ts">
/*
Slightly misleading not cookies but localstorage

*/
export const saveCookie = function (key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data))
}

export const addToCookie = function (key: string, item: string, data: unknown, new_data: unknown) {
  const cookie_data = JSON.parse(localStorage.getitem(key))
  cookie_data[item] = new_data
  localStorage.setItem(key, JSON.stringify(cookie_data))
}

export const getCookie = function (key: string, item?: string) {
  const data = localStorage.getItem(key)
  if (data && item) {
    return JSON.parse(data)[item]
  } else if (data) {
    return JSON.parse(data)
  }
  return null
}
export const clearCookie = function (key: string) {
  localStorage.removeItem(key)
}
export const removeAllCookies = function () {
  localStorage.clear()
}
</script>
