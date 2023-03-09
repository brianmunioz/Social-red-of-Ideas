//Inyeccion de dependencia
const { createContainer, asClass, asFunction, asValue } = require('awilix');
//config
const config = require('../config');
const server = require('./index');
//Routes
const { UploadRoutes, VoteRoutes, CommentRoutes, IdeaRoutes, UserRoutes, AuthRoutes, ReportedIdeasRoutes, SuspendedUsersRoutes } = require('../routes/index.routes');
const Routes = require('../routes');
//models
const { Vote, Comment, Idea, User, ReportedIdeas, SuspendedUsers } = require('../models');
//repository
const { VoteRepository, CommentRepository, IdeaRepository, UserRepository, ReportedIdeasRepository, SuspendedUsersRepository } = require('../repositories')
//services
const { VoteService, AuthService, CommentService, IdeaService, UserService, ReportedIdeasService, SuspendedUserService } = require("../services");
//controllers
const { VoteController, AuthController, CommentController, IdeaController, UserController, ReportedIdeasController, SuspendedUsersController } = require('../controllers')

const container = createContainer();
container
    .register({
        CommentService: asClass(CommentService).singleton(),
        IdeaService: asClass(IdeaService).singleton(),
        UserService: asClass(UserService).singleton(),
        AuthService: asClass(AuthService).singleton(),
        VoteService: asClass(VoteService).singleton(),
        ReportedIdeasService: asClass(ReportedIdeasService).singleton(),
        SuspendedUserService: asClass(SuspendedUserService).singleton()

    })
    .register({
        server: asClass(server).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        CommentController: asClass(CommentController.bind(CommentController)).singleton(),
        VoteController: asClass(VoteController.bind(VoteController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        AuthController: asClass(AuthController).singleton(),
        ReportedIdeasController: asClass(ReportedIdeasController.bind(ReportedIdeasController)).singleton(),
        SuspendedUsersController: asClass(SuspendedUsersController.bind(SuspendedUsersController)).singleton()

    })
    .register({
        CommentRoutes: asFunction(CommentRoutes).singleton(),
        VoteRoutes: asFunction(VoteRoutes).singleton(),
        IdeaRoutes: asFunction(IdeaRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        UploadRoutes: asFunction(UploadRoutes).singleton(),
        SuspendedUsersRoutes: asFunction(SuspendedUsersRoutes).singleton(),
        ReportedIdeasRoutes: asFunction(ReportedIdeasRoutes).singleton()

    })
    .register({
        User: asValue(User),
        Idea: asValue(Idea),
        Comment: asValue(Comment),
        Vote: asValue(Vote),
        ReportedIdeas: asValue(ReportedIdeas),
        SuspendedUsers: asValue(SuspendedUsers)
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton(),
        VoteRepository: asClass(VoteRepository).singleton(),
        ReportedIdeasRepository: asClass(ReportedIdeasRepository).singleton(),
        SuspendedUsersRepository: asClass(SuspendedUsersRepository).singleton()

    })

module.exports = container;