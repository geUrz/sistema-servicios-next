

export const formatDate = date => {

  const dateNew = new Date(date)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return dateNew.toLocaleDateString('es-ES', options)

}