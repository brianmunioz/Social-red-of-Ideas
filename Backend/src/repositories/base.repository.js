
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async get(id) {
        return await this.model.findById(id);
    }
    async getAll(pageSize = 5, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        return await this.model
            .find()
            .sort('-createdAt')
            .skip(skips)
            .limit(pageSize);
    }
    async create(entity) {
        return await this.model.create(entity);
    }
    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true  /*Esto sirve para que mongoose sepa que la base de datos fue actualizada*/ });
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

}
module.exports = BaseRepository;
