import AuthRepository from '../repositories/auth-repository';
import AppError from '../utils/app-error';
import { StatusCodes } from 'http-status-codes';
import { User } from '@prisma/client';
import { hashPassword } from '../utils/helper';

interface UserSignUpInput {
    email: string;
    password: string;
    role: 'admin' | 'user';
}

class AuthService {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async signup(userData: UserSignUpInput): Promise<Omit<User, 'password'>> {
        try {
            const existingUser = await this.authRepository.findByEmail(userData.email);

            if (existingUser) {
                throw new AppError(
                    'User with this email already exists',
                    StatusCodes.CONFLICT,
                    'USER_ALREADY_EXISTS',
                );
            }

            const passwordHash: string = await hashPassword(userData.password);

            const userToCreate = {
                email: userData.email,
                password: passwordHash,
                role: userData.role,
            };

            const user = await this.authRepository.create(userToCreate);

            const { password: _, ...userWithoutPassword } = user;

            return userWithoutPassword;
        } catch (err: unknown) {
            if (err instanceof AppError) {
                throw err;
            } else {
                throw new AppError(
                    'An unexpected server error occurred during signup',
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'INTERNAL_SERVER_ERROR',
                );
            }
        }
    }
}

export default AuthService;
