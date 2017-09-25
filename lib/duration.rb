Duration = Struct.new(:seconds) do

	SECONDS_IN_AN_HOUR = 3600
	SECONDS_IN_A_MINUTE = 60

def hours
	(seconds / SECONDS_IN_AN_HOUR)
end

def minutes
	seconds.remainder(SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE
end

end