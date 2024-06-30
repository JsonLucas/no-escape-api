import { ApiExpress } from "./src/infra/api/express/api.express";
import { CreateUserRoute } from "./src/infra/api/express/routes/user/create-user.express.route";
import { UserRepositoryPrisma } from "./src/infra/repositories/user/user.repository.prisma";
import { prisma } from "./src/utils/prisma";
import { CreateUserUsecase } from "./src/usecases/user/create-user.usecase";
import { port } from "./src/utils/env";
import { Validator } from "./src/helpers/Validator";
import { Crypto } from "./src/helpers/Crypto";
import { UserLoginRoute } from "./src/infra/api/express/routes/user/user-login.express.route";
import { GetUserByEmailUsecase } from "./src/usecases/user/get-user-by-email.usecase";
import { CreateSessionUsecase } from "./src/usecases/session/create-session.usecase";
import { SessionRepositoryPrisma } from "./src/infra/repositories/session/session.repository.prisma";
import { GetSessionByIdUsecase } from "./src/usecases/session/get-session-by-id.usecase";
import { RemoveSessionUsecase } from "./src/usecases/session/remove-session.usecase";
import { UpdateUserProfileUsecase } from "./src/usecases/user/update-user-profile.usecase";
import { UpdateUserProfileRoute } from "./src/infra/api/express/routes/user/update-user-profile.express.route";
import { GetUserByIdUsecase } from "./src/usecases/user/get-user-by-id.usecase";
import { UserProfileRoute } from "./src/infra/api/express/routes/user/get-user-profile.express.route";
import { CreateTrackingUsecase } from "./src/usecases/tracking/create-tracking.usecase";
import { TrackingRepositoryPrisma } from "./src/infra/repositories/tracking/tracking.repository.prisma";
import { CreateTrackingRoute } from "./src/infra/api/express/routes/tracking/create-tracking.express.route";
import { GetTrackingsByUserIdRoute } from "./src/infra/api/express/routes/tracking/get-all-user-trackings.express.route";
import { GetAllTrackingsUsecase } from "./src/usecases/tracking/get-all-trackings.usecase";
import { GetTrackingByIdUsecase } from "./src/usecases/tracking/get-tracking-by-id";
import { UpdateTrackingUsecase } from "./src/usecases/tracking/update-tracking.usecase";
import { RemoveTrackingUsecase } from "./src/usecases/tracking/remove-tracking.usecase";
import { GetTrackingByIdRoute } from "./src/infra/api/express/routes/tracking/get-tracking-by-id.express.route";
import { UpdateTrackingRoute } from "./src/infra/api/express/routes/tracking/update-tracking.express.route";
import { RemoveTrackingRoute } from "./src/infra/api/express/routes/tracking/remove-tracking.express.route";
import { UpdateUserPictureRoute } from "./src/infra/api/express/routes/user/update-user-picture.express.route";
import { UpdateUserPictureUsecase } from "./src/usecases/user/update-user-picture.usecase";
import { Upload } from "./src/helpers/Upload";
import { UserLogoutRoute } from "./src/infra/api/express/routes/user/user-logout.express.route";

(() => {
    const validator = Validator.create();
    const crypto = Crypto.create();
    const upload = Upload.create();

    const userRepository = UserRepositoryPrisma.create(prisma);
    const sessionRepository = SessionRepositoryPrisma.create(prisma);
    const trackingRepository = TrackingRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(userRepository);
    const getUserByEmailUsecase = GetUserByEmailUsecase.create(userRepository);
    const getUserByIdUsecase = GetUserByIdUsecase.create(userRepository);
    const updateUserProfileUsecase = UpdateUserProfileUsecase.create(userRepository);
    const updateUserPictureUsecase = UpdateUserPictureUsecase.create(userRepository);

    const createSessionUsecase = CreateSessionUsecase.create(sessionRepository);
    const getSessionByIdUsecase = GetSessionByIdUsecase.create(sessionRepository);
    const removeSessionUsecase = RemoveSessionUsecase.create(sessionRepository);

    const createTrackingUsecase = CreateTrackingUsecase.create(trackingRepository);
    const getAllTrackingsUsecase = GetAllTrackingsUsecase.create(trackingRepository);
    const getTrackingByIdUsecase = GetTrackingByIdUsecase.create(trackingRepository);
    const updateTrackingUsecase = UpdateTrackingUsecase.create(trackingRepository);
    const removeTrackingUsecase = RemoveTrackingUsecase.create(trackingRepository);

    const createUserRoute = CreateUserRoute.create(createUserUsecase, createSessionUsecase, validator, crypto);
    const loginRoute = UserLoginRoute.create(getUserByEmailUsecase, createSessionUsecase, validator, crypto);
    const logoutRoute = UserLogoutRoute.create(removeSessionUsecase);
    const userProfile = UserProfileRoute.create(getUserByIdUsecase, getSessionByIdUsecase);
    const upateUserProfileRoute = UpdateUserProfileRoute.create(updateUserProfileUsecase, getSessionByIdUsecase, validator, crypto);
    const updateUserPictureRoute = UpdateUserPictureRoute.create(updateUserPictureUsecase, getSessionByIdUsecase, validator, upload);

    const createTrackingRoute = CreateTrackingRoute.create(createTrackingUsecase, getAllTrackingsUsecase, getSessionByIdUsecase, validator);
    const getTrackingByIdRoute = GetTrackingByIdRoute.create(getTrackingByIdUsecase, getSessionByIdUsecase);
    const getAllTrackingsRoute = GetTrackingsByUserIdRoute.create(getAllTrackingsUsecase, getSessionByIdUsecase);
    const updateTrackingRoute = UpdateTrackingRoute.create(updateTrackingUsecase, getAllTrackingsUsecase, getSessionByIdUsecase, validator);
    const removeTrackingRoute = RemoveTrackingRoute.create(removeTrackingUsecase, getSessionByIdUsecase);

    const api = ApiExpress.create([
        createUserRoute, 
        loginRoute,
        logoutRoute,
        userProfile,
        upateUserProfileRoute,
        updateUserPictureRoute,
        
        createTrackingRoute,
        getTrackingByIdRoute,
        getAllTrackingsRoute,
        updateTrackingRoute,
        removeTrackingRoute
    ]);
    api.start(port);
})();