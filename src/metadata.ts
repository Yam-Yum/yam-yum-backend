/* eslint-disable */
export default async () => {
  const t = {
    ['./users/entities/user.entity']: await import('./users/entities/user.entity'),
    ['./recipe/entities/recipe.entity']: await import('./recipe/entities/recipe.entity'),
    ['./recipe/entities/recipe-image.entity']: await import(
      './recipe/entities/recipe-image.entity'
    ),
    ['./recipe/entities/recipe-video.entity']: await import(
      './recipe/entities/recipe-video.entity'
    ),
    ['./category/entities/category.entity']: await import('./category/entities/category.entity'),
    ['./users/entities/refresh_token.entity']: await import(
      './users/entities/refresh_token.entity'
    ),
    ['./users/entities/registration.entity']: await import('./users/entities/registration.entity'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [import('./users/dto/create-user.dto'), { CreateUserDto: {} }],
        [import('./users/dto/update-user.dto'), { UpdateUserDto: {} }],
        [
          import('./users/entities/registration.entity'),
          {
            Registration: {
              id: { required: true, type: () => String },
              phoneNumber: { required: true, type: () => String },
              otp: { required: true, type: () => String },
              otpExpireIn: { required: true, type: () => Date },
              otpConfirmed: { required: true, type: () => Boolean },
              verified: { required: true, type: () => Boolean },
              user: { required: true, type: () => t['./users/entities/user.entity'].User },
            },
          },
        ],
        [
          import('./users/entities/refresh_token.entity'),
          {
            RefreshToken: {
              id: { required: true, type: () => String },
              refreshToken: { required: true, type: () => String },
              expirationDate: { required: true, type: () => Date },
              user: { required: true, type: () => t['./users/entities/user.entity'].User },
            },
          },
        ],
        [
          import('./category/entities/category.entity'),
          {
            Category: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              image: { required: true, type: () => String },
              isActive: { required: true, type: () => Boolean },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              recipes: {
                required: true,
                type: () => [t['./recipe/entities/recipe.entity'].Recipe],
              },
            },
          },
        ],
        [
          import('./recipe/entities/recipe-image.entity'),
          {
            RecipeImage: {
              url: { required: true, type: () => String },
              recipe: { required: true, type: () => t['./recipe/entities/recipe.entity'].Recipe },
            },
          },
        ],
        [
          import('./recipe/entities/recipe-video.entity'),
          {
            RecipeVideo: {
              url: { required: true, type: () => String },
              recipe: { required: true, type: () => t['./recipe/entities/recipe.entity'].Recipe },
            },
          },
        ],
        [
          import('./recipe/entities/recipe.entity'),
          {
            Recipe: {
              id: { required: true, type: () => String },
              title: { required: true, type: () => String },
              description: { required: true, type: () => String },
              preparationTimeInMinutes: { required: true, type: () => Number },
              size: { required: true, enum: t['./recipe/entities/recipe.entity'].RecipeSize },
              price: { required: true, type: () => Number },
              status: { required: true, enum: t['./recipe/entities/recipe.entity'].RecipeStatus },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              images: {
                required: true,
                type: () => [t['./recipe/entities/recipe-image.entity'].RecipeImage],
              },
              video: {
                required: true,
                type: () => t['./recipe/entities/recipe-video.entity'].RecipeVideo,
              },
              category: {
                required: true,
                type: () => t['./category/entities/category.entity'].Category,
              },
              author: { required: true, type: () => t['./users/entities/user.entity'].User },
            },
          },
        ],
        [
          import('./users/entities/user.entity'),
          {
            User: {
              id: { required: true, type: () => String },
              firstName: { required: true, type: () => String },
              lastName: { required: true, type: () => String },
              username: { required: true, type: () => String },
              email: { required: true, type: () => String },
              phoneNumber: { required: true, type: () => String },
              password: { required: true, type: () => String },
              profilePicture: { required: true, type: () => String },
              role: { required: true, enum: t['./users/entities/user.entity'].UserRole },
              gender: { required: true, enum: t['./users/entities/user.entity'].UserGender },
              dateOfBirth: { required: true, type: () => Date },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              refreshToken: {
                required: true,
                type: () => t['./users/entities/refresh_token.entity'].RefreshToken,
              },
              registration: {
                required: true,
                type: () => t['./users/entities/registration.entity'].Registration,
              },
              recipes: {
                required: true,
                type: () => [t['./recipe/entities/recipe.entity'].Recipe],
              },
            },
          },
        ],
        [
          import('./auth/dto/login.dto'),
          {
            LoginDto: {
              username: { required: true, type: () => String },
              phoneNumber: { required: true, type: () => String },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./auth/dto/signup.dto'),
          {
            SignupDto: {
              firstName: { required: true, type: () => String },
              lastName: { required: true, type: () => String },
              phoneNumber: { required: true, type: () => String },
              email: { required: true, type: () => String },
              username: { required: true, type: () => String },
              password: { required: true, type: () => String },
              dateOfBirth: { required: true, type: () => Date },
              gender: { required: true, enum: t['./users/entities/user.entity'].UserGender },
            },
          },
        ],
        [
          import('./auth/dto/request-otp.dto'),
          { RequestOtpDto: { phoneNumber: { required: true, type: () => String } } },
        ],
        [
          import('./auth/dto/confirm-otp.dto'),
          { ConfirmOtpDto: { otp: { required: true, type: () => String } } },
        ],
        [
          import('./category/dto/create-category.dto'),
          {
            CreateCategoryDto: {
              name: { required: true, type: () => String },
              image: { required: true, type: () => String },
            },
          },
        ],
        [import('./category/dto/update-category.dto'), { UpdateCategoryDto: {} }],
        [
          import('./recipe/dto/create-recipe.dto'),
          {
            CreateRecipeDto: {
              title: { required: true, type: () => String },
              description: { required: true, type: () => String },
              preparationTimeInMinutes: { required: true, type: () => Number },
              size: { required: false, enum: t['./recipe/entities/recipe.entity'].RecipeSize },
              price: { required: true, type: () => Number },
              categoryId: { required: true, type: () => String },
              authorId: { required: true, type: () => String },
            },
          },
        ],
        [import('./recipe/dto/update-recipe.dto'), { UpdateRecipeDto: {} }],
      ],
      controllers: [
        [import('./app.controller'), { AppController: { getHello: { type: String } } }],
        [
          import('./users/users.controller'),
          {
            UsersController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
        [
          import('./auth/auth.controller'),
          { AuthController: { login: {}, signup: {}, requestOtp: {}, confirmOtp: {} } },
        ],
        [
          import('./category/category.controller'),
          {
            CategoryController: {
              create: { type: Object },
              getList: { type: [t['./category/entities/category.entity'].Category] },
              get: { type: t['./category/entities/category.entity'].Category },
              update: {},
              remove: {},
            },
          },
        ],
        [
          import('./recipe/recipe.controller'),
          {
            RecipeController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
      ],
    },
  };
};
