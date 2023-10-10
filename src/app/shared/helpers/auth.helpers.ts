import { environment } from 'src/environments/environment';

export const getToken = () => {
  const infoUser = getLocalStorageUser();

  if (infoUser === null) {
    return '';
  }

  const info = JSON.parse(infoUser);
  return info.token ? info.token : '';
}

export const removeUserToken = () => {
  localStorage.removeItem(environment.nameLocalStorageInfoUser);
}

export const getModulosMenu = () => {
  const infoUser = getLocalStorageUser();

  if (infoUser === null) {
    return '';
  }

  const info = JSON.parse(infoUser);
  return info.modulos ? info.modulos : [];
}

export const getLocalStorageUser = () => {
  return localStorage.getItem( environment.nameLocalStorageInfoUser );
}
