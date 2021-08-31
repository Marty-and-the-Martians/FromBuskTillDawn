import React from 'react';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

const Search = ({ panTo }) => {
  const {
    ready, value, suggestions: { status, data }, setValue, clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 39.7392,
        lng: () => -104.9903,
      },
      radius: 1000,
    },
  });

  return (
    <div>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Select A Location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' ? data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            )) : null}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
