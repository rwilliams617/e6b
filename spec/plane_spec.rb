require_relative 'spec_helper'

describe Plane do

  describe "temperature_calculations" do
    before do
      @plane = Plane.new
    end

    it "convert into 32 farenheit" do
      @plane.convert.must_equal 32
    end
  end

  describe "true_airspeed" do
    before do
      @plane = Plane.new
    end

    it "calculates the true airspeed as 13 knots" do
      @plane.true_airspeed.must_equal 13
    end
  end

end