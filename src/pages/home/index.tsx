import { ICountryDetail } from "types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce, mapSelectiveKeyName } from "utils/jsUtils";
import { ALL_COUNTRIES_URL, COUNTRIES_BY_NAME } from "./api";
import { useFetch } from "hooks/useFetch";
import Input from "antd/es/input/Input";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, MenuProps, Row, Space } from "antd";
import "./home.css";

const Home: React.FC<{}> = () => {
  const [countries, setCountries] = useState<ICountryDetail[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const regions = ["", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const { Meta } = Card;

  //use fetch hook throwing illegal invocation
  // const { response, loading, error } = useFetch(
  //   "https://restcountries.com/v2/all"
  // );

  const regionItems = regions.map((region) => {
    return {
      label: region,
      key: region,
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const debouncedSearch = debounce(handleInputChange, 400);

  useEffect(() => {
    async function fetchAllCountries() {
      const response = await fetch(ALL_COUNTRIES_URL);
      const countries = await response.json();

      const filteredCountriesData: ICountryDetail[] = mapSelectiveKeyName(
        countries,
        ["name", "population", "region", "capital", "flag"]
      );

      setCountries(filteredCountriesData);
    }
    fetchAllCountries();
  }, []);

  useEffect(() => {
    async function fetchCountriesByName(searchText: string) {
      if (!searchText.length) return;
      const response = await fetch(`${COUNTRIES_BY_NAME}/${searchText}`);
      const countries = await response.json();

      const filteredCountriesData: ICountryDetail[] = mapSelectiveKeyName(
        countries,
        ["name", "population", "region", "capital", "flag"]
      );

      setCountries(filteredCountriesData);
    }

    fetchCountriesByName(searchText);
  }, [searchText]);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedRegion(e.key);
  };

  return (
    <Row className="home-wrapper">
      <Col span={24}>
        <Row gutter={[12, 12]} justify="space-between">
          <Col>
            <Input
              size="large"
              placeholder="Search for a country..."
              prefix={<SearchOutlined />}
              onChange={(event) => debouncedSearch(event)}
            />
          </Col>
          <Col>
            <Dropdown
              menu={{
                items: regionItems,
                onClick: handleMenuClick,
              }}
            >
              <Button>
                <Space>
                  Filter by Region
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Row gutter={[48, 48]} className="grid-wrapper">
          {countries
            .filter(
              ({ region }) => !selectedRegion || region === selectedRegion
            )
            .sort((lhs, rhs) => rhs.population - lhs.population) // sorting is expensive on each render will it be helpfull to memoize this ?
            .map(({ name, region, population, flag, capital }) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={name}>
                <Link to={`detail/${name}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                      <img alt="flag-img" className="cover-img" src={flag} />
                    }
                    aria-label="flag-card"
                  >
                    <Meta
                      title={name}
                      description={
                        <Row>
                          <Col span={24}>
                            <Row>
                              <Col className="card-description">
                                Population:
                              </Col>
                              <Col className="card-metric">{population}</Col>
                            </Row>
                          </Col>
                          <Col span={24}>
                            <Row>
                              <Col className="card-description">Region:</Col>
                              <Col className="card-metric">{region}</Col>
                            </Row>
                          </Col>
                          <Col span={24}>
                            <Row>
                              <Col className="card-description">Capital:</Col>
                              <Col className="card-metric">{capital}</Col>
                            </Row>
                          </Col>
                        </Row>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
