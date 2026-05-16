"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
let ReviewsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ReviewsService = _classThis = class {
        constructor(prisma) {
            this.prisma = prisma;
        }
        /**
         * Create a review for a completed booking
         */
        async createReview(bookingId, userId, rating, comment) {
            if (rating < 1 || rating > 5) {
                throw new common_1.BadRequestException('Rating must be between 1 and 5');
            }
            // Verify booking belongs to user and is approved
            const booking = await this.prisma.booking.findFirst({
                where: {
                    id: bookingId,
                    customerId: userId,
                    status: 'APPROVED',
                },
            });
            if (!booking) {
                throw new common_1.ForbiddenException('You cannot review this booking');
            }
            // Ensure only one review per booking
            const existingReview = await this.prisma.review.findUnique({
                where: {
                    bookingId,
                },
            });
            if (existingReview) {
                throw new common_1.BadRequestException('Review already submitted');
            }
            return this.prisma.review.create({
                data: {
                    bookingId,
                    businessId: booking.businessId,
                    rating,
                    comment,
                },
            });
        }
        /**
         * Get all reviews for a business
         */
        async getBusinessReviews(businessId) {
            return this.prisma.review.findMany({
                where: { businessId },
                orderBy: { createdAt: 'desc' },
            });
        }
        /**
         * Admin: delete an inappropriate review
         */
        async deleteReview(reviewId) {
            const review = await this.prisma.review.findUnique({
                where: { id: reviewId },
            });
            if (!review) {
                throw new common_1.NotFoundException('Review not found');
            }
            return this.prisma.review.delete({
                where: { id: reviewId },
            });
        }
    };
    __setFunctionName(_classThis, "ReviewsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReviewsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReviewsService = _classThis;
})();
exports.ReviewsService = ReviewsService;
