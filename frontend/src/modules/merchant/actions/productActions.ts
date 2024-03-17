import { store } from "../../../redux";
import { actions as merchanStore } from "../data/merchantReducer";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";
import { createClient } from '@supabase/supabase-js'
import { randomId } from "../../../utils";

export const fetchStoreProducts = async () => {
    try {
        const merchantInfo = store.getState()[MERCHANT_STORE_NAME].merchantInfo ?? (localStorage.getItem('merchantInfo') && JSON.parse(localStorage.getItem('merchantInfo') ?? '')) ;

        const createdBy = merchantInfo?.user_id ?? process.env.REACT_APP_MERCHANT_ID ?? ''
        const response = await fetch(`http://127.0.0.1:8000/product/store/list/?created_by=${createdBy}`);
        const data = await response.json();
        store.dispatch(merchanStore.getStoreProducts(data));
    } catch (error) {
        console.log(error)
    }
};

export const createProduct = async (e: any) => {
    e.preventDefault()
    try {
        const merchantInfo = store.getState()[MERCHANT_STORE_NAME].merchantInfo ?? JSON.parse(localStorage.getItem('merchantInfo') ?? '') ;
        
        const formData = new FormData(e.target);

        if(formData.getAll('images')?.length > 3) {
            return alert('You can only upload 3 images at a time')
        }
        const files = [];
        
        if(formData.getAll('images')?.length > 0) {
            for (let index = 0; index < formData.getAll('images').length; index++) {
                const file = formData.getAll('images')[index] as File; 
                
                const url = await uploadFile(file)
                files.push(url)
            }
        }

        const product = {
            name: formData.get('name') as string,
            name_ar: formData.get('name_ar') as string,
            description: formData.get('description') as string,
            description_ar: formData.get('description_ar') as string,
            price: formData.get('price') as unknown as number,
            stock: formData.get('stock') as unknown as number,
            created_by: merchantInfo.user_id,
            images: files,
        };
        const response = await fetch(`http://127.0.0.1:8000/product/create/`, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        store.dispatch(merchanStore.createProduct(responseData.product));
        alert('Product created successfully')
    } catch (error) {
        console.log(error);
        return alert('Error creating product');
    }
}



async function uploadFile(file: File) {
    try {
        const supabase = createClient(
            process.env.REACT_APP_SUPABASE_PROJECT_URL || '',
            process.env.REACT_APP_SUPABASE_API_KEY || ''
        );

        //Generate a unique filename
        const filePath = `${randomId()}-${file.name}`;
        const { data, error } = await supabase.storage.from('products').upload(filePath, file);
        if (error) {
            return alert('Error uploading file: ' + error.message)

        } else {
            const downloadData = supabase.storage.from('products').getPublicUrl(filePath)
            return downloadData.data.publicUrl;
        }
    } catch (error) {
        return alert('Error uploading file')
    }
}
export const updateProduct = async (product: any) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/product/update/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        store.dispatch(merchanStore.updateProduct(product));
        alert('Product updated successfully')
    } catch (error) {
        console.log(error)
        alert('Error deleting product');
    }
}

export const deleteProduct = async (productId: number)  => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/product/delete/${productId}/`, {
            method: 'DELETE',
        });
        store.dispatch(merchanStore.deleteProdut(productId));
        alert('Product deleted successfully')
    } catch (error) {
        console.log(error)
        alert('Error deleting product');
    }
}
