import { Icon, Text } from "react-native-paper"
import { Pressable } from "react-native"

import { createStyles } from "@/styles/create.styles"

import { VenuePropsType } from "@/types/venues.types"

const Venue = ({ venue, handleUpdateVenue, colors, spacing }: VenuePropsType) => {
    return (
        <Pressable style={[createStyles.containTeamAdded,
        { borderColor: colors.primary, backgroundColor: colors.tertiary }]}
            onPress={() => handleUpdateVenue(venue)}>
            <Text variant="bodyLarge" style={{ marginLeft: spacing.w45 }}>
                {venue.name}
            </Text>
            <Icon source="stadium" size={24} color={colors.primary} />
        </Pressable>
    )
}

export default Venue