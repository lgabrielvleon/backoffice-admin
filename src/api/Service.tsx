import { environment } from "../environments/environments";
import { ServiceListResponse, Service as ServiceRq, UpdateServiceRq } from "../types/Service";

class Service {

    async getServices(

    ): Promise<ServiceListResponse[]>{
        const key: string = environment.apiKey;
        const url: string = environment.api.msSharedServices.getServices;
        let listServices: Array<ServiceListResponse> ;

        try {
            listServices = await fetch(url,{
                method: "GET",
                headers:{
                    "content-type": "application/json",
                    "Accept": "application/json",
                    "x-api-key": key
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            return listServices;
        } catch (error) {
            console.error('Error en: ', error);
            return error;
        }
    }
    
    async createService(
        body: ServiceRq[]
    ): Promise<void>{
        const key: string = environment.apiKey;
        const url: string = environment.api.msSharedServices.getServices;
        let listServices: Array<ServiceListResponse> ;
        try {
            listServices = await fetch(url,{
                method: "POST",
                headers:{
                    "content-type": "application/json",
                    "Accept": "application/json",
                    "x-api-key": key
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            console.info(listServices);
        } catch (error) {
            console.error('Error en: ', error);
            return error;
        }
    }

    async updateService(
        body: ServiceRq
    ): Promise<void>{
        const key: string = environment.apiKey;
        const url: string = environment.api.msSharedServices.updateService + body.id;

        const bodyUpdateRq: UpdateServiceRq = {
            action: body.action,
            condition: body.condition,
            name: body.name,
            price: body.price,
            service: body.service,
            unit: body.unit
        }
        try {
            await fetch(url,{
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": key
                },
                body: JSON.stringify(bodyUpdateRq)
            }).then(res => {
                res.ok&&console.info(res)
            })
        } catch (error) {
            console.error('Error en: ', error);
        }
    }

    async deleteService(
        id: string,
    ): Promise<void> {
        const key: string = environment.apiKey;
        const url: string = environment.api.msSharedServices.deleteService + id;
        try{
            await fetch(url,{
                headers: { "content-type": "application/json", "x-api-key": key},
                method: "DELETE"
            })
        }catch (error) {
            console.error(error);
        }
    }
}

export const service = new Service();