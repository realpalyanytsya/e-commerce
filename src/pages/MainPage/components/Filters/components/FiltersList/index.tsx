import CenterSpinner from '../../../../../../components/Spinner/CenterSpinner';
import {
    useGetBrands,
    useGetCategories
} from '../../../../../../features/products/productsService';
import Brands from '../Brands';
import Categories from '../Categories';
import PriceRange from '../PriceRange';

function Divider() {
    return <div className="w-full pt-0.5 bg-gray-200 my-1" />;
}

function FiltersList() {
    const { isLoading: isLoadingCategories } = useGetCategories({});
    const { isLoading: isLoadingBrands } = useGetBrands({});

    return (
        <div className="flex h-sidebar overflow-y-scroll flex-col border shadow rounded-lg bg-white gap-4 py-2 px-4">
            <div className="mb-5">
                <h2 className="font-semibold mb-2">Price</h2>
                <PriceRange />
            </div>

            {isLoadingBrands || isLoadingCategories ? <CenterSpinner /> : null}

            <Divider />

            <Categories />

            <Divider />

            <Brands />
        </div>
    );
}

export default FiltersList;
