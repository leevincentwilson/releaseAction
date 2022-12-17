"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createRelease();
        }
        catch (error) {
            console.log(error);
        }
    });
}
const createRelease = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = core.getInput('token');
    const git = github.getOctokit(token);
    console.log('token', token);
    console.log('git', git);
    git.rest.repos.createRelease({
        owner: getOwner(),
        repo: getRepo(),
        tag_name: getTag()
    });
});
const getTag = () => {
    const tag = core.getInput('tag');
    if (tag) {
        return tag;
    }
    const ref = github.context.ref;
    const tagPath = "refs/tags/";
    if (ref && ref.startsWith(tagPath)) {
        return ref.substr(tagPath.length, ref.length);
    }
    throw Error("No tag found in ref or input!");
};
const getRepo = () => {
    let repo = core.getInput('repo');
    if (repo) {
        return repo;
    }
    return github.context.repo.repo;
};
const getOwner = () => {
    let owner = core.getInput('owner');
    if (owner) {
        return owner;
    }
    return github.context.repo.owner;
};
run();
