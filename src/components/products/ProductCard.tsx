import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Button, Title, Paragraph, Text} from 'react-native-paper';
import {getImageUrl} from '../../utils/imageHelpers';
import {formatPrice} from '../../utils/format';

interface ProductCardProps {
  item: any;
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
}

const ProductCard = ({item, onEdit, onDelete}: ProductCardProps) => (
  <Card style={styles.productItem}>
    {item.images && item.images.length > 0 && (
      <Card.Cover
        source={{
          uri: getImageUrl(item.images[0]?.originalUrl),
          headers: {Accept: '*/*'},
        }}
        style={styles.productImage}
      />
    )}
    <Card.Content>
      <Title>{item.name}</Title>
      <Paragraph style={styles.price}>{formatPrice(item.price1)}</Paragraph>
      <View style={styles.stockContainer}>
        <Text
          style={[
            styles.stockText,
            {color: item.stockAmount > 0 ? '#4CAF50' : '#f44336'},
          ]}>
          {item.stockAmount > 0 ? `Stok: ${item.stockAmount}` : 'Stokta Yok'}
        </Text>
      </View>
    </Card.Content>
    <Card.Actions style={styles.cardActions}>
      <Button mode="contained" onPress={() => onEdit(item.id)} icon="pencil">
        Düzenle
      </Button>
      <Button
        mode="contained"
        onPress={() => onDelete(item.id, item.name)}
        icon="delete"
        buttonColor="#f44336">
        Sil
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  productItem: {
    marginBottom: 8,
    elevation: 2,
  },
  productImage: {
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stockContainer: {
    marginTop: 8,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
});

export default ProductCard;
