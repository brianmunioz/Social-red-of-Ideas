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
        return await this.repository.update(id, entity);

    }
    async delete(idParam,idUser) {
        if (!idParam) {
            const error = new Error();
            error.status = 400;
            error.message = 'Id not valid!';
            throw error;
        }

        if(idUser !== idUser){
            const error = new Error();
            error.status = 400;
            error.message = 'You are not authorized to delete';
            throw error;
        }
       

        return await this.repository.delete(idParam);
    }
}
module.exports = BaseService;