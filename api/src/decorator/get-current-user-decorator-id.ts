import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
	(data: undefined, context: ExecutionContext) => {
		// Get request from context
		const request = context.switchToHttp().getRequest();
		console.log("GetCurrentUserId request: " + request)
		if (request.user) {
			console.log("GetCurrentUserId request.user: " + request.user);
			return request.user.id;
		}
		console.log("NO USEEERRR:(");
		return null; // or throw an error
	},
);
