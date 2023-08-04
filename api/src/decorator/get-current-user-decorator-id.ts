import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
	(data: undefined, context: ExecutionContext) => {
		// Get request from context
		const request = context.switchToHttp().getRequest();
		if (request.user) {
			return request.user.id;
		}
		return null; // or throw an error
	},
);
