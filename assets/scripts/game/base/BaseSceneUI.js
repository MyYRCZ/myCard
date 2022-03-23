
let BaseSceneUI = cc.Class({
    extends: cc.Component,

    properties: {
        loadedPrefabs: null,
        prefabPath: null
    },

    onLoad () {
        console.log("BaseSceneUI onLoad");
    },

    start () {

    },

    readyLoadPrefabs () {
        if (this.loadedPrefabs == null) {
            this.loadedPrefabs = {};
        }

        for (let i in this.prefabPath) {
            let path = this.prefabPath[i];
            this.loadRes(path);
        }
    },

    loadRes (path, success) {
        cc.resources.load(path, (err, prefab) => {
            if (err) return;
            if (prefab && !prefab.data) {
                cc.resources.release(path);
                return;
            }
            if (this && this.loadedPrefabs) this.loadedPrefabs[path] = prefab;
            if (success) success(this.loadedPrefabs[path]);
        });
    },

    getPrefabByPath(path, success) {
        if (this.loadedPrefabs != null && this.loadedPrefabs[path] != null) {
            let prefab = this.loadedPrefabs[path];
            if (prefab && !prefab.data) {
                cc.resources.release(path);
                delete this.loadedPrefabs[path];
                this.getPrefabByPath(path, success);
            } else {
                if (success) success(this.loadedPrefabs[path]);
            } 
        } else {
            console.warn("不存在预加载的预制体: ", path);
            this.loadRes(path, success);
        }
    },

    // update (dt) {},
});
