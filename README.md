# firebase-storage
## Usar imágenes desde Firebase/Storage sin URL

Es posible crear una referencia a las imágenes almacenadas en el storage de firebase de manera que se pueda acceder a ellas a través del nombre del archivo, el cual puede ser devuelto por la consulta a una BBDD (firestore por ej).
Para ello en el archivo db/index.js donde están los datos de conexión a firebase hay que agregar dos cosas (el import de firestore y la función que retorne la conexión al bucket del storage con el que vamos a trabajar):

```
import 'firebase/storage'; 

export function getStorage(){
  return firebase.storage(app)
}
```

Para usarlo en un componente es necesario importar esa función, y hacer uso del método **ref("nombre.jpg")** pasándole como parámetro el nombre del archivo y su extensión, si el archivo está dentro de un directorio del storage es posible pasarle el path ("folder/nombre").
Una vez teniendo la referencia al archivo se debe hacer uso del método **getDownloadURL()** que devuelve una promesa con la url de la imagen solicitada. Por ej:

```
import React,{useState,useEffect} from 'react';
import {getStorage} from './db';

export default function Imagen({src,alt}){
  const [url,SetUrl] = useState('https://plchldr.co/1/300x300')  //ruta por defecto
  useEffect(()=>{
    getStorage().ref(src).getDownloadURL()
      .then(val=>setUrl(val))
      .catch(err=>console.log(err))
  },[])
}
```

Luego se puede retornar una etiqueta **img** pasándole como valore del atributo _src_ la variable _url_

```
return <img src={url} alt={alt} />
```

Este componente **<Imagen />** puede ser usando en cualquier parte de la aplicación donde se necesite renderizar una imagen desde el storage, siendo de gran utilidad su uso en la función _map()_ del render de productos en donde se podrá pasarle como parámetro el valor del campo imagen de la colección. También facilitaría la suba masiva de imágenes ya que no será necesario copiar la url de cada una para pegarla en el campo correspondiente de cada ítem.

### Referencia
https://firebase.google.com/docs/storage/web/create-reference?hl=es 
