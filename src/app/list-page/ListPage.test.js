import React from "react";
import { render, screen, wait, fireEvent } from "../../testUtils";

import { ListPage } from "./ListPage";
import { globalData, countriesData, dayOneDataGermany } from "../../testsMockData";

const initialState = {
  stats: {
    status: "succeeded",
    error: null,
    countryDataStatus: "succeeded",
    currentCountry: countriesData[0],
    data: { Global: globalData, Countries: countriesData },
    countryData: dayOneDataGermany,
  },
};

describe("List Page", () => {
  it("Should display table with all the data", () => {
    render(<ListPage />, { initialState: initialState });

    expect(screen.getByText(/Num/i)).toBeInTheDocument();
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Total cases/i)).toBeInTheDocument();
    expect(screen.getByText(/Total deaths/i)).toBeInTheDocument();
    expect(screen.getByText(/Total recovered/i)).toBeInTheDocument();

    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(countriesData.length + 1);

    countriesData.forEach((country) => {
      expect(screen.getByText(country.Country)).toBeInTheDocument();
      expect(screen.getByText(country.TotalConfirmed)).toBeInTheDocument();
      expect(screen.getByText(country.TotalDeaths)).toBeInTheDocument();
      expect(screen.getByText(country.TotalRecovered)).toBeInTheDocument();
    });
  });
});
