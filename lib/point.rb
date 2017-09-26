class Point

	PI_IN_RADIANS = Math::PI / 180

	attr_reader :lat, :lng

	def initialize(lat: , lng:)
		@lat = lat
		@lng = lng
	end

	def to_radians
		{lat: lat * PI_IN_RADIANS, lng: lng * PI_IN_RADIANS}
	end

	def distance_to(point)
		(Earth::RADIUS_KM * Math.acos(cosines_product(point) + sines_product(point))).round(3)
	end

	private 
	def cosines_product(point)
		Math.cos(point.to_radians[:lat]) * Math.cos(to_radians[:lat]) * Math.cos(to_radians[:lng] - point.to_radians[:lng])
	end

	def sines_product(point)
		Math.sin(point.to_radians[:lat]) * Math.sin(to_radians[:lat])
	end
end