const { latestDate } = require('../helpers')
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async get(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'Id send!';
            throw error;
        }
        const currentEntity = await this.repository.get(id);
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'No exist!';
            throw error;
        }
        return currentEntity;
    }
    async getAll(pageSize, pageNum) {
        return await this.repository.getAll(pageSize, pageNum);
    }
    async create(entity) {
        return await this.repository.create(entity);
    }
    async update(id, entity) {

        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'No valid ID!';
            throw error;
        }
        if (!entity.typeUpdate) {
            const error = new Error();
            error.status = 400;
            error.message = 'You need to send type of update!';
            throw error;
        }
        if(entity.typeUpdate !== 'vote'){
            const doUpdated = latestDate(new Date(entity.dateUpdated).getTime(), entity.typeUpdate)

            if (!doUpdated) {
                const error = new Error();
                error.status = 400;
                error.message = 'You not do because you need wait it takes 7 days to update';
                throw error;
            }
        }
       


        return await this.repository.update(id, entity);

    }
    async delete(idParam, idUser,type) {
        if (!idParam) {
            const error = new Error();
            error.status = 400;
            error.message = 'Id not valid!';
            throw error;
        }
        if(!type){
            
            if (idParam !== idUser) {
                const error = new Error();
                error.status = 400;
                error.message = 'You are not authorized to delete';
                throw error;
            }
        }
        


        return await this.repository.delete(idParam);
    }

}
module.exports = BaseService;