import { ENV, authFetch } from "@/utils"

export class Budgets{
  async getAll(){
    try {
      const sortFilter = 'sort=publishedAt:desc'
      const populateFilter = 'populate=*'
      const filters = `${sortFilter}&${populateFilter}` 
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGETS}?${filters}`
      const response = await fetch(url)
      const result = await response.json()

      if(response.status !== 200) throw result

      return result

    } catch (error) {
        throw error
    }
  }

  async getById(id){
    try {
     
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGETS}/${id}`
      const response = await fetch(url)
      const result = await response.json()

      if(response.status !== 200) throw result

      return result;

    } catch (error) {
        throw error
    }
  }

  async getBySlug(slug){
    try {
      const filter = `filters[slug][$eq]=${slug}`
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGETS}?${filter}`
      const response = await fetch(url)
      const result = await response.json()

      if(response.status !== 200) throw result

      return result.data[0]

    } catch (error) {
        throw error
    }
  }

  async create(userId, data){
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGETS}`
      const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: {
        ...data,
        user: userId,
      },
    }),
    }

    const response = await authFetch(url, params)
    const result = await response.json()

    if(response.status !== 200) throw result

      return result

    } catch (error) {
       throw error
    }
  }

  async update(budgetId, data){
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGETS}/${budgetId}`
      const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data}),
    }

    const response = await authFetch(url, params)
    const result = await response.json()

    if(response.status !== 200) throw result

      return result

    } catch (error) {
       throw error
    }
  }

  async delete(budgetId){
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGETS}/${budgetId}`
        const params = {
          method: 'DELETE',
        }

        const response = await authFetch(url, params)
        const result = await response.json()

        if(response.status !== 200) throw result

        return result

    } catch (error) {
        throw error
    }
  }

}


