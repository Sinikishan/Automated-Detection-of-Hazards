from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import os
datagen = ImageDataGenerator(
        rotation_range=10,
        width_shift_range=0.15,
        height_shift_range=0.15,
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        vertical_flip=True,
        fill_mode='nearest')
for dust_class in ["yes","no"]:
    for fil in os.listdir("ori_dust/"+dust_class):
        img = load_img("ori_dust/"+dust_class+"/"+fil)  # this is a PIL image
        x = img_to_array(img)  # this is a Numpy array with shape (3, 150, 150)
        x = x.reshape((1,) + x.shape)  # this is a Numpy array with shape (1, 3, 150, 150)

        # the .flow() command below generates batches of randomly transformed images
        # and saves the results to the `preview/` directory
        i = 0
        for batch in datagen.flow(x, batch_size=1,
                                save_to_dir=dust_class+'_aug', save_prefix=dust_class, save_format='jpeg'):
            i += 1
            if i > 15:
                break  # otherwise the generator would loop indefinitely
