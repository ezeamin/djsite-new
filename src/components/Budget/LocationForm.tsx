import Script from 'next/script';
import { useState } from 'react';

import GMapsComboBox from '../ui/GMapsComboBox/GMapsComboBox';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import { toast } from 'sonner';

import { FormSchemas } from '@/forms';

import { LocationFormProps } from '../interface/budget';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const LocationForm = <T extends FormSchemas>(props: LocationFormProps<T>) => {
  const { control, setValue, name } = props;

  const [query, setQuery] = useState('');

  const handleSelect = async (address: string) => {
    try {
      const data = await geocodeByAddress(address);
      setValue(name as string, data[0].formatted_address);
      setQuery(data[0].formatted_address);
    } catch (error) {
      toast.error(
        'La dirección ingresada no es válida. Por favor, revisá este campo'
      );
    }
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=gcallback&loading=async`}
      />
      <PlacesAutocomplete
        debounce={500}
        googleCallbackName="gcallback"
        value={query || ''}
        onChange={setQuery}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <GMapsComboBox
            className="w-full"
            control={control}
            getInputProps={getInputProps}
            getSuggestionItemProps={getSuggestionItemProps}
            label="Ubicación (exacta)"
            loading={loading}
            name="location"
            options={suggestions.map((s) => ({
              id: s.id,
              description: s.description,
            }))}
            placeholder="Buscá tu dirección"
            query={query}
            setQuery={setQuery}
          />
        )}
      </PlacesAutocomplete>
    </>
  );
};
export default LocationForm;
