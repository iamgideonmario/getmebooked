"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
let DashboardController = (() => {
    let _classDecorators = [Controller('dashboard'), UseGuards(AuthGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _index_decorators;
    let _availability_decorators;
    let _saveAvailability_decorators;
    var DashboardController = _classThis = class {
        index(req, res) {
            res.render('dashboard/index', {
                user: req.user
            });
        }
        async availability(req, res) {
            const availability = await this.availabilityService.getAvailability(req.business.id);
            res.render('dashboard/availability', {
                availability,
                csrfToken: req.csrfToken(),
            });
        }
        async saveAvailability(body, req, res) {
            await this.availabilityService.createAvailability(req.business.id, Number(body.dayOfWeek), body.startTime, body.endTime);
            res.redirect('/dashboard/availability');
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "DashboardController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _index_decorators = [Get()];
        _availability_decorators = [Get('availability')];
        _saveAvailability_decorators = [Post('availability')];
        __esDecorate(_classThis, null, _index_decorators, { kind: "method", name: "index", static: false, private: false, access: { has: obj => "index" in obj, get: obj => obj.index }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _availability_decorators, { kind: "method", name: "availability", static: false, private: false, access: { has: obj => "availability" in obj, get: obj => obj.availability }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _saveAvailability_decorators, { kind: "method", name: "saveAvailability", static: false, private: false, access: { has: obj => "saveAvailability" in obj, get: obj => obj.saveAvailability }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardController = _classThis;
})();
exports.DashboardController = DashboardController;
