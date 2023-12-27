import { Get, Put, Delete, Post, toastCustom } from "../utils/function";

let route = "users";
// config'den apiUrl verilmesi gerekli
export async function getUsers() {
  try {
    let response = await Get(route, false, 300);
    toastCustom("Test", 1);
    return response.data;
  } catch (error) {
    return false;
  }
}
export async function getUserByID(id) {
  try {
    let response = await Get(`${route}/${id}`, false, 300);
    return response;
  } catch (error) {
    return false;
  }
}
export async function createAdmin(body) {
  try {
    let response = await Post(route, body, true, false, true);
    toastCustom("Kullanıcı Başarıyla Oluşturuldu", 1);
    return response;
  } catch (error) {
    return false;
  }
}
export async function deleteUser(id) {
  try {
    let response = await Delete(`${route}/${id}`, false);
    toastCustom("Kullanıcı Başarıyla Silindi", 1);
    return response;
  } catch (error) {
    return false;
  }
}
export async function updateAdmin(body) {
  try {
    let response = await Put(route, body, true, false, true);
    toastCustom("Kullanıcı Başarıyla Güncellendi", 1);
    return response;
  } catch (error) {
    return false;
  }
}
