import type { Scene } from "../../scene";
import { Texture } from "./texture";
import { Constants } from "../../Engines/constants";
import "../../Engines/Extensions/engine.rawTexture";
import type { Nullable } from "../../types";
/**
 * Class used to store 3D textures containing user data
 */
export class RawTexture3D extends Texture {
    /**
     * Create a new RawTexture3D
     * @param data defines the data of the texture
     * @param width defines the width of the texture
     * @param height defines the height of the texture
     * @param depth defines the depth of the texture
     * @param format defines the texture format to use
     * @param scene defines the hosting scene
     * @param generateMipMaps defines a boolean indicating if mip levels should be generated (true by default)
     * @param invertY defines if texture must be stored with Y axis inverted
     * @param samplingMode defines the sampling mode to use (Texture.TRILINEAR_SAMPLINGMODE by default)
     * @param textureType defines the texture Type (Engine.TEXTURETYPE_UNSIGNED_INT, Engine.TEXTURETYPE_FLOAT...)
     * @param creationFlags specific flags to use when creating the texture (Constants.TEXTURE_CREATIONFLAG_STORAGE for storage textures, for eg)
     */
    constructor(
        data: Nullable<ArrayBufferView>,
        width: number,
        height: number,
        depth: number,
        /** Gets or sets the texture format to use */
        public format: number,
        scene: Scene,
        generateMipMaps: boolean = true,
        invertY: boolean = false,
        samplingMode: number = Texture.TRILINEAR_SAMPLINGMODE,
        textureType = Constants.TEXTURETYPE_UNSIGNED_INT,
        creationFlags?: number
    ) {
        super(null, scene, !generateMipMaps, invertY);

        this._texture = scene.getEngine().createRawTexture3D(data, width, height, depth, format, generateMipMaps, invertY, samplingMode, null, textureType, creationFlags);

        this.is3D = true;
    }

    /**
     * Update the texture with new data
     * @param data defines the data to store in the texture
     */
    public update(data: ArrayBufferView): void {
        if (!this._texture) {
            return;
        }
        this._getEngine()!.updateRawTexture3D(this._texture, data, this._texture.format, this._texture!.invertY, null, this._texture.type);
    }

    /**
     * Creates a RGBA storage texture from some data.
     * @param data define the texture data
     * @param width define the width of the texture
     * @param height define the height of the texture
     * @param depth define the depth of the texture
     * @param scene defines the hosting scene
     * @param generateMipMaps define whether or not to create mip maps for the texture
     * @param invertY define if the data should be flipped on Y when uploaded to the GPU
     * @param samplingMode define the texture sampling mode (Texture.xxx_SAMPLINGMODE)
     * @param type define the format of the data (int, float... Engine.TEXTURETYPE_xxx)
     * @returns the RGBA texture
     */
    public static CreateRGBAStorageTexture(
        data: Nullable<ArrayBufferView>,
        width: number,
        height: number,
        depth: number,
        scene: Scene,
        generateMipMaps: boolean = true,
        invertY: boolean = false,
        samplingMode: number = Constants.TEXTURE_TRILINEAR_SAMPLINGMODE,
        type: number = Constants.TEXTURETYPE_UNSIGNED_INT
    ): RawTexture3D {
        return new RawTexture3D(
            data,
            width,
            height,
            depth,
            Constants.TEXTUREFORMAT_RGBA,
            scene,
            generateMipMaps,
            invertY,
            samplingMode,
            type,
            Constants.TEXTURE_CREATIONFLAG_STORAGE
        );
    }
}
